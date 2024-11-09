import sys
import json
import pickle
import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.preprocessing import MinMaxScaler
from sklearn.decomposition import PCA
from scipy.spatial import ConvexHull
import matplotlib.pyplot as plt
import os
import uuid

# Load model components
with open("kmeans_model.pkl", "rb") as f:
    model_data = pickle.load(f)

kmeans = model_data["kmeans"]
scaler = model_data["scaler"]
pca = model_data["pca"]

# Load and normalize employee data
employee_survey_70_df = pd.read_csv('Employee_Survey_Dataset_Example.csv')
normalized_data = scaler.transform(employee_survey_70_df)
clusters = kmeans.predict(normalized_data)

# Add cluster information for visualization
employee_survey_70_df['Cluster'] = clusters
reduced_data = pca.transform(normalized_data)

# Visualization of clusters and the new candidate
new_candidate = np.array([[3, 4, 5, 2, 3, 4, 1, 5, 2, 3]])  # example candidate data
new_candidate_normalized = scaler.transform(new_candidate)
new_candidate_reduced = pca.transform(new_candidate_normalized)

# Define cluster colors for visualization
cluster_colors = {0: '#1566E0', 1: '#78004C', 2: '#32CD32'}
colors = [cluster_colors[label] for label in clusters]

# Plot and save the cluster visualization
plt.figure(figsize=(12, 8))
plt.scatter(reduced_data[:, 0], reduced_data[:, 1], c=colors, marker='o', s=80, alpha=0.7)
plt.scatter(new_candidate_reduced[:, 0], new_candidate_reduced[:, 1], color='red', marker='X', s=300, edgecolor='white', label='New Candidate')

for cluster_id in np.unique(clusters):
    points = reduced_data[clusters == cluster_id]
    hull = ConvexHull(points)
    for simplex in hull.simplices:
        plt.plot(points[simplex, 0], points[simplex, 1], color=cluster_colors[cluster_id], lw=2)

plt.xlabel('Principal Component 1', fontsize=14)
plt.ylabel('Principal Component 2', fontsize=14)
plt.title('Employee Clusters with Boundaries', fontsize=16)
for i, label in cluster_colors.items():
    plt.scatter([], [], color=label, label=f'Cluster {i}', s=80, alpha=0.7)
plt.legend(loc='upper right', fontsize=12)
plt.grid(visible=True, linestyle='--', linewidth=0.5)

# Ensure pictures directory exists
os.makedirs("pictures", exist_ok=True)

# Generate a unique filename for the image and save it
filename = f"clusters_{uuid.uuid4().hex}.png"
filepath = os.path.join("pictures", filename)
plt.savefig(filepath, dpi=300, bbox_inches='tight')
plt.close()

# Predict the cluster for the new candidate and calculate distances
predicted_cluster = kmeans.predict(new_candidate_normalized)[0]
distance_to_centroid = np.linalg.norm(new_candidate_normalized - kmeans.cluster_centers_[predicted_cluster])

# Calculate average distance for cluster employees
cluster_points = normalized_data[clusters == predicted_cluster]
average_distance_to_centroid = np.mean([np.linalg.norm(point - kmeans.cluster_centers_[predicted_cluster]) for point in cluster_points])

# Determine similarity
similarity = "similar" if distance_to_centroid <= average_distance_to_centroid * 1.2 else "significantly different"

# Output the results as JSON with the image path
results = {
    "predicted_cluster": int(predicted_cluster),
    "distance_to_centroid": float(distance_to_centroid),
    "average_distance_to_centroid": float(average_distance_to_centroid),
    "similarity": similarity,
    "image_path": filepath
}
print(json.dumps(results))
