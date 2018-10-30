from flask import Flask, jsonify, send_from_directory, render_template
import pandas as pd


app = Flask(__name__)


# This is an API meant to serve some housing price index data
@app.route('/hpi/<string:seasonality>/<string:metro>')
def return_hpi_data(seasonality, metro):

    # Read in raw data
    raw_data = pd.read_csv(
        'https://raw.githubusercontent.com/charleyferrari/CUNY_DATA608/master/lecture3/Sample%20Code/hpi.csv')

    # Filter based on seasonality and metro
    filtered_data = raw_data.loc[(raw_data['Seasonality'] == seasonality) & (raw_data['Metro'] == metro),
                                 ['DATE', 'Tier', 'HPI']]

    # Deal with datetime
    filtered_data['DATE'] = pd.to_datetime(filtered_data['DATE'])

    # Pivot so it's easier to build our json. Data now looks like this:
    # | Date | High | Middle | Low |
    # (Date is the index)
    filtered_data = filtered_data.pivot(columns='Tier', index='DATE', values='HPI')

    # Build our json, then return it with jsonify
    filtered_data_json = {
        'Date': filtered_data.index.map(lambda x: x.strftime(format='%Y-%m')).tolist(),
        'High': filtered_data['High'].tolist(),
        'Middle': filtered_data['Middle'].tolist(),
        'Low': filtered_data['Low'].tolist()
    }

    return jsonify(filtered_data_json)


# This routing allows us to view index.html
@app.route('/')
def index():
    return render_template('index.html')


# This routing allows us to load local Javascript
@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('js', path)


if __name__ == '__main__':
    app.run(debug=True)
