from sentence_transformers import SentenceTransformer, util
model = SentenceTransformer('paraphrase-distilroberta-base-v1')
# Two lists of sentences
sentences1 = ['human',
             'A man is playing guitar',
             'The new movie is awesome']

sentences2 = ['animal',
              'A woman watches TV',
              'The new movie is so great']
#Compute embedding for both lists
embeddings1 = model.encode(sentences1, convert_to_tensor=True)
embeddings2 = model.encode(sentences2, convert_to_tensor=True)
#Compute cosine-similarits
cosine_scores = util.pytorch_cos_sim(embeddings1, embeddings2)
#Output the pairs with their score
for i in range(len(sentences1)):
    print("{} \t\t {} \t\t Score: {:.4f}".format(sentences1[i], sentences2[i], cosine_scores[i][i]))
# print("Tarfah")
# sys.stdout.flush()