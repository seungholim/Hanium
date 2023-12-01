import numpy as np
import pandas as pd
import pymysql
from sqlalchemy import create_engine
from sklearn.metrics.pairwise import cosine_distances
from sklearn.neighbors import NearestNeighbors

#db connection
#pymysql
db = pymysql.connect(
    host='ipaddress',
    port=3306,
    user='root',
    passwd='passwd',
    db='db',
    charset='utf8'
)
cursor = db.cursor()

#tbRating : index, user_idx, recipe_idx, rating, rateDate
sqlRating = 'SELECT * FROM tb_rating;'
tbRating = pd.read_sql_query(sqlRating, db)

#calculating max idx
sqlMaxUserIdx = 'SELECT MAX(user_idx) FROM tb_rating;'
sqlMaxRecipeIdx = 'SELECT MAX(recipe_idx) FROM tb_rating;'

cursor.execute(sqlMaxUserIdx)
rowsMaxUserIdx = cursor.fetchall()
maxUserIdx = rowsMaxUserIdx[0][0] #max user_idx
cursor.execute(sqlMaxRecipeIdx)
rowsMaxRecipeIdx = cursor.fetchall()
maxRecipeIdx = rowsMaxRecipeIdx[0][0] #max recipe_idx

#tbRating(data frame) -> ratings(2-dimensional array)
ratings = np.zeros((maxUserIdx, maxRecipeIdx))
for row in tbRating.itertuples(): #loop every row
    ratings[row[1]-1, row[2]-1] = row[3] #tbRating(column1, column2) -> ratings(row: user_idx, column: recipe_idx)
print(ratings)

#cosine distance
print(cosine_distances(ratings))

distances = 1 - cosine_distances(ratings)
print(distances)
print(distances.shape)

#KNN(k-nearest neighbor), unsupervised learning
k = 5
neigh = NearestNeighbors(n_neighbors = k, metric = "cosine")
print(neigh.fit(ratings))
top_k_distances, top_k_users = neigh.kneighbors(ratings, return_distance = True)
print(top_k_distances, top_k_users)

#prediction by using weighted sum of selected users
user_pred_k = np.zeros(ratings.shape)

for i in range(ratings.shape[0]):
    user_pred_k[i, :] = top_k_distances[i].T.dot(ratings[top_k_users][i]) / np.array([np.abs(top_k_distances[i].T).sum(axis = 0)]).T

print(user_pred_k)

#if exists, empty tb_cf
sqlCf = 'SELECT * FROM tb_cf;'
dataCf = pd.read_sql_query(sqlCf, db)

if len(dataCf.index):
    sqlEmpty = 'TRUNCATE TABLE tb_cf;'
    cursor.execute(sqlEmpty)

#filtering data from predicted data(greater than 3.8); cf : user_idx, recipe_idx
cf = []
for i in range(len(user_pred_k)):
    for j in range(len(user_pred_k[0])):
        if user_pred_k[i][j] > 3.8:
            cf.append([i + 1, j + 1])

dfCf = pd.DataFrame(cf, columns = ['user_idx', 'recipe_idx'])

#create_engine from sqlalchemy
db_data = 'mysql+pymysql://' + 'root' + ':' + '1q2w3e4r!!' + '@' + '54.180.140.180' + ':3306/' \
       + 'footdb' + '?charset=utf8'
engine = create_engine(db_data, encoding='utf-8')

dfCf = dfCf.groupby(["user_idx"])[["recipe_idx"]].count()

dfCf.to_sql(name='tb_cf', con=engine, if_exists='append')

#close
cursor.close()
db.close()
