library(ggplot2)
library(dplyr)
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
    plotOutput('plot1'),
    verbatimTextOutput('stats')
  )
)

server <- shinyServer(function(input, output, session) {
  
  selectedData <- reactive({
    dfSlice <- df %>%
      filter(Seasonality == input$seas, Metro == input$metro)
  })
  
  output$plot1 <- renderPlot({
    
    dfSlice <- df %>%
      filter(Seasonality == input$seas, Metro == input$metro)
    
    ggplot(selectedData(), aes(x = DATE, y = HPI, color = Tier)) +
      geom_line()
  })
  
  output$stats <- renderPrint({
    dfSliceTier <- selectedData() %>%
      filter(Tier == input$tier)
    
    summary(dfSliceTier$HPI)
  })
  
})

shinyApp(ui = ui, server = server)
