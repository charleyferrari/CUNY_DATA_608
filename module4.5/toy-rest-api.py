from flask import Flask, jsonify
import pandas as pd

app = Flask(__name__)


# This is a hello world flask api.
# visit localhost:5000/hello in a browser to see what gets returned
@app.route('/hello', methods=['GET'])
def return_hello():
    return jsonify({'hello': 'world'})


# This is a more complex API who's returned information depends on a variable
# from the URL.
# visit localhost:5000/complex/foo to see what gets returned. Replace
# foo with other words to verify the API is reponding to that variable.
@app.route('/complex/<string:word>')
def return_complex(word):
    return jsonify({'complex': word})

# And this is an API meant to serve some housing price index data


@app.route('/hpi/<strong:seasonality>/<string:metro>')
def return_hpi_data(seasonality, metro):
    raw_data = pd.read_csv(
        'https://raw.githubusercontent.com/charleyferrari/CUNY_DATA608/master/lecture3/Sample%20Code/hpi.csv')
    filtered_data = raw_data.loc[['DATE', 'Tier', 'HPI'],
                                 raw_data['Seasonality'] == seasonality & raw_data['metro'] == metro]
    filtered_data.sort_values('')


if __name__ == '__main__':
    app.run(debug=True)
