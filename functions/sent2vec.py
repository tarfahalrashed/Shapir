# https://pypi.org/project/sent2vec/
import os
import sys
os.system('python3 -m pip install {}'.format(sys.argv[1]))
# os.system('python3 -m pip install {}'.format(sys.argv[2]))
# os.system('python3 -m pip install {}'.format(sys.argv[3]))

# from sent2vec.vectorizer import Vectorizer

# sentences = [
#     # "This is an awesome book to learn NLP.",
#     # "DistilBERT is an amazing NLP model.",
#     # "We can interchangeably use embedding, encoding, or vectorizing.",
#     "https api dailymotion com playlist playlist Id videos",
#     "Video Object",
#     "book"
# ]
# vectorizer = Vectorizer()
# vectorizer.bert(sentences)
# vectors = vectorizer.vectors

# from scipy import spatial

# dist_1 = spatial.distance.cosine(vectors[0], vectors[1])
# dist_2 = spatial.distance.cosine(vectors[0], vectors[2])
# print('dist_1: {0}, dist_2: {1}'.format(dist_1, dist_2))
# print(dist_1)
# sys.stdout.flush()
# assert dist_1 < dist_2