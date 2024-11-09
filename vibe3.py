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

# Load the KMeans model
with open("kmeans_model.pkl", "rb") as f:
    model_data = pickle.load(f)

kmeans = model_data["kmeans"]

# Load the employee data
employee_survey_70_df = pd.read_csv('Employee_Survey_Dataset_Example.csv')

# Fit a new scaler on the employee data
scaler = MinMaxScaler()
normalized_data = scaler.fit_transform(employee_survey_70_df)

# Predict clusters for the employees
clusters = kmeans.predict(normalized_data)

# Add cluster information to the DataFrame
employee_survey_70_df['Cluster'] = clusters

# Fit PCA on the normalized data
pca = PCA(n_components=2)
reduced_data = pca.fit_transform(normalized_data)

# Read features from stdin
input_text = sys.stdin.read()
features = json.loads(input_text)

# Convert features to NumPy array
new_candidate = np.array([features])

# Normalize and reduce the new candidate's data using the same scaler and PCA
new_candidate_normalized = scaler.transform(new_candidate)
new_candidate_reduced = pca.transform(new_candidate_normalized)

# Define colors for clusters: blue, purple, green
cluster_colors = {0: '#1566E0', 1: '#78004C', 2: '#32CD32'}
colors = [cluster_colors[label] for label in clusters]

# Plot and save the cluster visualization
plt.figure(figsize=(12, 8))

# Visualize employees with clusters
scatter = plt.scatter(reduced_data[:, 0], reduced_data[:, 1],
                      c=colors, marker='o', s=80, alpha=0.7)

# Visualize the new candidate
plt.scatter(new_candidate_reduced[:, 0], new_candidate_reduced[:, 1],
            color='red', marker='X', s=300, edgecolor='white', label='New Candidate')

# Draw hulls for each cluster
for cluster_id in np.unique(clusters):
    points = reduced_data[clusters == cluster_id]
    if len(points) >= 3:  # ConvexHull requires at least 3 points
        hull = ConvexHull(points)
        for simplex in hull.simplices:
            plt.plot(points[simplex, 0], points[simplex, 1], color=cluster_colors[cluster_id], lw=2)
    else:
        # For clusters with less than 3 points, plot them individually
        plt.plot(points[:, 0], points[:, 1], 'o', color=cluster_colors[cluster_id])

# Axes and annotations
plt.xlabel('Principal Component 1', fontsize=14)
plt.ylabel('Principal Component 2', fontsize=14)
plt.title('Employee Clusters with Boundaries', fontsize=16)

# Legend for clusters
for i, label in cluster_colors.items():
    plt.scatter([], [], color=label, label=f'Cluster {i}', s=80, alpha=0.7)
plt.legend(loc='upper right', fontsize=12)

# Grid for analysis
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

# Calculate average distance for employees in this cluster
cluster_points = normalized_data[clusters == predicted_cluster]
average_distance_to_centroid = np.mean([
    np.linalg.norm(point - kmeans.cluster_centers_[predicted_cluster]) for point in cluster_points
])

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
