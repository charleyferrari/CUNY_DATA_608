library(ggplot2)
library(dplyr)
library(plotly)
library(shiny)

df <- read.csv('https://raw.githubusercontent.com/charleyferrari/CUNY_DATA608/master/lecture3/Sample%20Code/hpi.csv')
df$DATE <- as.POSIXct(strptime(df$DATE, format = '%m/%d/%y'))

ui <- fluidPage(
  headerPanel('Housing Price Explorer'),
  sidebarPanel(
    selectInput('seas', 'Seasonality', unique(df$Seasonality), selected='SA'),
    selectInput('metro', 'Metro Area', unique(df$Metro), selected='Atlanta'),
    selectInput('tier', 'Housing Tier', unique(df$Tier), selected='High')
  ),
  mainPanel(
    plotlyOutput('plot1'),
    verbatimTextOutput('stats')
  )
)

server <- function(input, output, session) {
  

  
  output$plot1 <- renderPlotly({
    
    dfSlice <- df %>%
      filter(Seasonality == input$seas, Metro == input$metro)
    
    plot_ly(dfSlice, x = ~DATE, y = ~HPI, color = ~Tier, type='scatter',
            mode = 'lines')
  })
  
  output$stats <- renderPrint({
    dfSliceTier <- dfSlice %>%
      filter(Tier == input$tier)
    
    summary(dfSliceTier$HPI)
  })
  
}

shinyApp(ui = ui, server = server)