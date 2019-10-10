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
    plotOutput('plot1')
  )
)

server <- function(input, output) {
  
  output$plot1 <- renderPlot({
    
    dfSlice <- df %>%
      filter(Metro == input$metro)
    
    ggplot(dfSlice, aes(x = DATE, y = HPI, color = Tier)) +
      geom_line()
  })
  
}

shinyApp(ui = ui, server = server)