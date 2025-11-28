
import pandas as pd
import io

"""
    Cleans the given DataFrame by performing the following operations:
    - Removes duplicate rows.
    - Cleans column names by stripping whitespace, converting to lowercase, and replacing spaces with underscores
    - Handles missing values by filling numeric columns with 0 and non-numeric columns with N/D
    - Strips whitespace from string columns
"""

def clean_dataframe(df: pd.DataFrame) -> pd.DataFrame:
    
    # Revome duplicates
    df = df.drop_duplicates()

    # Clean column names
    df.columns = [str(c).strip().lower().replace(" ", "_") for c in df.columns]

    # Handle missing values
    for col in df.columns:
        if pd.api.types.is_numeric_dtype(df[col]):
            df[col] = df[col].fillna(0)
        else:
            df[col] = df[col].fillna("N/D")

    # Strip whitespace from string columns
    df = df.applymap(lambda x: x.strip() if isinstance(x, str) else x)

    return df

def csv_to_dataframe(file) -> dict | None:

    try:

        file_content = file.read()
        
        # build DataFrame from CSV content
        df = pd.read_csv(io.BytesIO(file_content))

        # clean the DataFrame
        df_cleaned = clean_dataframe(df)

        # Build response data
        response_data = {
            "messaggio": "File elaborato con successo (Backend Flask)",
            "righe_originali": len(df),
            "righe_finali": len(df_cleaned),
            "colonne": list(df_cleaned.columns),
            # take first 5 rows as preview
            "anteprima_dati": df_cleaned.head(5).to_dict(orient="records")
        }
        return response_data

    except Exception as e:
        print(f"Errore: {e}")
        return None