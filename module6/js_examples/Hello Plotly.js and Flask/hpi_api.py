from flask import Flask, jsonify, send_from_directory, render_template
import pandas as pd


app = Flask(__name__)


# This is an API meant to serve plotly graph objects given a metro and seasonality
@app.route('/hpi/<string:seasonality>/<string:metro>')
def return_hpi_data(seasonality, metro):

    # Read in raw data
    raw_data = pd.read_csv('assets/data/hpi.csv')

    # Filter based on seasonality and metro
    filtered_data = raw_data.loc[(raw_data['Seasonality'] == seasonality) & (raw_data['Metro'] == metro),
                                 ['DATE', 'Tier', 'HPI']]

    # Deal with datetime
    filtered_data['DATE'] = pd.to_datetime(filtered_data['DATE'])

    # Pivot so it's easier to build our json. Data now looks like this:
    # | Date | High | Middle | Low |
    # (Date is the index)
    filtered_data = filtered_data.pivot(columns='Tier', index='DATE', values='HPI')

    # Build Plotly object, then return it with jsonify
    fig = {
        'data': [
            {
                'type': 'scatter',
                'x': filtered_data.index.map(lambda x: x.strftime(format='%Y-%m')).tolist(),
                'y': filtered_data[tier].tolist(),
                'name': tier
            } for tier in ['High', 'Middle', 'Low']
        ],
        'layout': {
            'title': metro + ' Housing Prices'
        }
    }

    return jsonify(fig)


# This is an API meant to serve available values for seasonality and metro
@app.route('/hpi/values')
def return_hpi_defaults():
    # Read in raw data
    raw_data = pd.read_csv('assets/data/hpi.csv')

    # Build json of unique values
    values = {
        'seasonality': raw_data['Seasonality'].unique().tolist(),
        'metros': raw_data['Metro'].unique().tolist()
    }

    return jsonify(values)


# This routing allows us to view index.html
@app.route('/')
def index():
    return render_template('index.html')


# This routing allows us to load local files
@app.route('/assets/<path:path>')
def send_js(path):
    return send_from_directory('assets', path)


if __name__ == '__main__':
    app.run(debug=True)
