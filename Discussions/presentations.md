## DATA 608 BiWeekly Discussion

Every even week will involve a discussion on a visualization topic presented by Edward Tufte. The topics (as well as some additional context to serve as a discussion starter) are outlined below.

Each student will be required to be a "discussion leader" for one of these disucssions. A discussion leader will be required to bring a couple of visualization examples from the web related to the concept being discussed.

These discussions are meant to be very open-ended. If you agree with the concept, highlight examples that successfully implement the concept, or unsuccessful visualizations that fail to. If you don't agree with the concept (or think it's overrated,) come with counterexamples. Think about the concept and be prepared to comment on what other students bring.

One theme I'd like to bring into all of our discussions is how visualizations on the web differ from the largely static visualizations Tufte discusses. Do these concepts apply to interactive visualizations, or does interactivity totally change what's possible?

[link to Google!](http://google.com)
![Tux, the Linux mascot](/assets/images/tux.png)


### Week 2: Data-Ink Ratio and ChartJunk

The first concept we'll be discussing is the data-ink ratio. This is a core concept of data visualization introduced by Edward Tufte that we'll be discussing in our first meetup, but in the meantime read [this page](https://infovis-wiki.net/wiki/Data-Ink_Ratio) for some background.

<img src="http://static1.squarespace.com/static/56713bf4dc5cb41142f28d1f/5671e8bf816924fc22651410/5671eae2816924fc2265189a/1450306274301/data-ink.gif" width="640" height="460" alt="Animation of removing chartjunk" title="Chartjunk Removal" />

A related concept to the data-ink ratio is Chartjunk.

Tufte refers to Chartjunk as one of the major features you need to minimize in a chart. It can be any part of a visualization that doesn’t add to understanding the data behind it (and many times, actively obscures the understanding of that data.)

He refers to two types of Chartjunk directly:

- Unintentional Optical art: Either caused by using patterns to distinguish areas or grids.

<img src="https://i.pinimg.com/736x/6d/0c/78/6d0c78476ecadf6fe82e1279b6366b4f--edward-tufte.jpg" />

- Self-Promoting Graphics: When data measures or structures themselves become design elements.

<img src="https://www.edwardtufte.com/bboard/images/00040Z-22231/VDQIp119.jpg" />

In addition, Tufte explains how design-based chart-junk in particular can be misleading. When data measures themselves are represented with design as the core concern, the visual effect might be misrepresented. In the below example, data is mapped to the areas of the road:

<img src="https://logisticalmiasma.files.wordpress.com/2012/03/lie_factor1.png" />

To preserve design, the data isn't properly represented. On the other hand, this same data can be represented in a visualization with chartjunk that is still superfluous, but not misleading:

<img src="http://images.slideplayer.com/28/9387317/slides/slide_30.jpg" width="1280" height="720" />

### Week 4: High Resolution Graphics

Tufte devotes a chapter to high-resolution data graphics, and I would like to use this as an excuse to talk about visualizing large datasets in general.

Tufte focuses on data density: the number of datapoints displayed divided by the total chart area. When thinking of examples of visualizing large datasets, try to think of creative ways that a high data density can be displayed. There are lots of interactive elements that make higher density displays more successful online, but feel free to focus on strategies that might not be limited to an online medium. Perhaps a unique visualization method was used, or there is a quality of the data that lends itself to being more clear as a dense visualization.

For example: Tufte uses a New York weather chart as an example of a dense visualization.

<img src="https://www.edwardtufte.com/bboard/images/00014g-836.jpg" />

This image is fairly dense, but because it is displaying weather, the inherent seasonality makes it easier to read.

Think about the ways visualizations can aggregate data as well. Basic types of aggregation visualization types include histograms (to aggregate large data across a single dimension) or heatmaps (to aggregate large data across two dimensions.) Any visualization type can be used to visualize aggregated data however. When asking questions of large datasets, not only is there a choice of visualization type, but a choice of aggregation.

Think of unique strategies you've seen applied to big data. One example I use with clients at Plotly that goes beyond basic aggregation is a fake signal with random spikes added. Plotting out all the points results in a visualization that's pretty busy:

<img src="https://plot.ly/~charleyferrari/690.png">

Simply aggregating the data would preserve the patterns, but make us lose information about the spikes. To preserve more information, we could combine an aggregation with some other way to highlight spikes:

<img src="https://plot.ly/~charleyferrari/699.png">

This results in a cleaner visualization with minimal information loss.

### Week 6: Small Multiples


We talked about small multiples during our meetup, but check out [this link](http://www.juiceanalytics.com/writing/better-know-visualization-small-multiples) for some more information on them.

In particular, pay attention to the specifics of Tufte's definition of small multiples: The small multiples can either be mapped to a quantitative variable not shown in the individual images, or it can be used to show motion over time, like frames in a movie. Keep theese distinctions in mind when talking about how the usefulness of small multiples changes in an interactive environment.

Think tools like ggplot (facet_wrap or facet_grid) or Tableau. A lot of visualization packages have begun standardizing the concept of small multiples. Is this a good thing? Or does this lead to their overuse?
