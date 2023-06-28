import csv

input_csv_file = "../Datasets/Raw Data/Us Counties by Month and Weather.csv"

# Define the path to the output CSV file
output_csv_file = "../Datasets/Parsed Data/ US Counties by Month and Weather.csv"

# Open the input CSV file and create a new list to store the cleaned data
cleaned_data = []

with open(input_csv_file, "r") as file:
    reader = csv.DictReader(file)
    
    # Iterate over each row in the CSV
    for row in reader:
        state = row["State"]
        county = row["County"].replace('"', "").split(",")[0].strip()
        month = row["Month"]
        max_temp = row["Avg Daily Max Air Temperature (F)"]
        min_temp = row["Avg Daily Min Air Temperature (F)"]
        
        # Only append if month and month code are not empty
        if month:
            cleaned_data.append({
                "State": state,
                "County": county,
                "Month": month,
                "Avg Daily Max Air Temperature (F)": max_temp,
                "Avg Daily Min Air Temperature (F)": min_temp
            })

# Write the cleaned data to the output CSV file
with open(output_csv_file, "w", newline="") as file:
    fieldnames = ["State", "County", "Month", "Avg Daily Max Air Temperature (F)", "Avg Daily Min Air Temperature (F)"]
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    
    writer.writeheader()
    writer.writerows(cleaned_data)

print(f"Data has been successfully written to {output_csv_file}.")