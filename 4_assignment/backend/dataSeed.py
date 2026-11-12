import pandas as pd
import databaseSQL
import databaseMongo
import numpy as np

def clear_databases():
    """Clears both SQL and NoSQL databases."""

    # SQL
    try:
        databaseSQL.db_clear()
    except Exception as e:
        print(f"Error while clearing SQL: {e}")

    # NoSQL
    try:
        databaseMongo.db_clear()
        print("NoSQL database was cleared successfully.")
    except Exception as e:
        print(f"Error while clearing NoSQL: {e}")

def seed_data():

    clear_databases()
    databaseSQL.db_init()

    df = pd.read_csv('data/sales_data_dictionary.csv')
    df = df.replace({np.nan: None})  # Replace NaN with None for SQL insertion

    sql_only_df = df.iloc[:12]
    nosql_only_df = df.iloc[12:24]
    shared_df = df.iloc[24:]

    databaseSQL.insert_many_data(shared_df.to_dict(orient='records'))
    shared_df = databaseSQL.get_all_data()
    databaseSQL.insert_many_data(sql_only_df.to_dict(orient='records'))
    print("SQL data inserted successfully.")

    nosql_only_df = nosql_only_df.to_dict(orient='records')
    for i, row in enumerate(nosql_only_df, start=1000):
        row['id'] = i
    nosql_data = nosql_only_df + shared_df
    databaseMongo.insert_many_data(nosql_data)
    print("NoSQL data inserted successfully.")