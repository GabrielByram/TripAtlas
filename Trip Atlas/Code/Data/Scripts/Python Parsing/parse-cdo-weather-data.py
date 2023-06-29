import csv

ANSI = "cp1252"

input_csv_file = "../../Datasets/Raw Data/Us-Counties-by-Month-and-Weather.csv"

# Define the path to the output CSV file
output_csv_file = "../../Datasets/Parsed Data/Parsed-US-Counties-by-Month-and-Weather.csv"

# Open the input CSV file and create a new list to store the cleaned data
cleaned_data = []

with open(input_csv_file, "r", encoding=ANSI, newline="") as file:
    reader = csv.DictReader(file)
    
    # Iterate over each row in the CSV
    for row in reader:
        state = row["State"]
        county = row["County"].replace('"', "").split(" County")[0].strip()
        month = row["Month"]
        max_temp = row["AvgDailyMaxAirTempF"].strip()
        min_temp = row["AvgDailyMinAirTempF"].strip()
        
        # Only append if month and month code are not empty
        if month:
            cleaned_data.append({
                "State": state,
                "County": county,
                "Month": month,
                "AvgDailyMaxAirTempF": max_temp,
                "AvgDailyMinAirTempF": min_temp
            })

# Write the cleaned data to the output CSV file
with open(output_csv_file, "w", encoding="utf-8") as file:
    fieldnames = ["State", "County", "Month", "AvgDailyMaxAirTempF", "AvgDailyMinAirTempF"]
    writer = csv.DictWriter(file, fieldnames=fieldnames, lineterminator="\n")
    
    writer.writeheader()
    writer.writerows(cleaned_data)

print(f"Data has been successfully written to {output_csv_file}.")