import sys
import json
import pickle
import numpy as np
import pandas as pd

# Load all objects
with open("kmeans_model.pkl", "rb") as f:
    model_data = pickle.load(f)

kmeans = model_data["kmeans"]
scaler = model_data["scaler"]
pca = model_data["pca"]

# Load and normalize initial employee data
employee_survey_70_df = pd.read_csv('Employee_Survey_Dataset_Example.csv')
normalized_data = scaler.transform(employee_survey_70_df)

# Get clusters for employees
clusters = kmeans.predict(normalized_data)

# Read features from stdin
input_text = sys.stdin.read()
features = json.loads(input_text)

# Convert features to NumPy array
new_candidate = np.array([features])

# Normalize and apply PCA to the new candidate
new_candidate_normalized = scaler.transform(new_candidate)
new_candidate_reduced = pca.transform(new_candidate_normalized)

# Predict cluster for the new candidate
predicted_cluster = kmeans.predict(new_candidate_normalized)[0]

# Calculate distance to centroid of this cluster
distance_to_centroid = np.linalg.norm(new_candidate_normalized - kmeans.cluster_centers_[predicted_cluster])

# Average distance to centroid for employees in this cluster
cluster_points = normalized_data[clusters == predicted_cluster]
average_distance_to_centroid = np.mean(
    [np.linalg.norm(point - kmeans.cluster_centers_[predicted_cluster]) for point in cluster_points]
)

# Prepare results
results = {
    "predicted_cluster": int(predicted_cluster),
    "distance_to_centroid": float(distance_to_centroid),
    "average_distance_to_centroid": float(average_distance_to_centroid),
    "similarity": "similar" if distance_to_centroid <= average_distance_to_centroid * 1.2 else "significantly different"
}

# Output the results as JSON
print(json.dumps(results))
