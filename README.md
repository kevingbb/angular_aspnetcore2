# SPA with Angular, ASP.NET Core 2.0, Cognitive Services, Azure Search & Azure SQL

This is an Angular app with an asp.net core 2.0 api back-end. It leverages services like Cognitive Services Bing Search and Computer Vision to find and tag images. The user can then select an image and save those details to Azure Blob Storage and Azure SQL. Azure Search is then used to provide a search experience into those saved images.

## Setup
In addition to cloning the repo you will need to setup the following services in Azure:
* Cognitive Services - Bing Search
* Cognitive Services - Computer Vision
* Azure Storage Account
* Azure Search
* Azure SQL

## Cognitive Services Setup
Once the Cogntive Services are created you will need to do a find and replace in the code on **<COGNITIVE_SERVICES_KEY_GOES_HERE>** and **<COGNITIVE_SERVICES_KEY_GOES_HERE>**.

## Azure Storage Account Setup
Once the Storage Account is created you will need to do a find and replace in the code on **<STORAGE_ACCOUNT_NAME_GOES_HERE>** and **<STORAGE_ACCOUNT_KEY_GOES_HERE>**.

## Azure SQL Setup
Once the SQL Database has been created you will need to do a find and replace in the code on **<AZURE_SQL_CONNECTION_STRING_GOES_HERE>**. In addition to setting the connection string, you will also need to setup the DB using Entity Framework.

## Azure Search Setup
Once Search has been created and setup to search against Azure SQL, you will need to do a find and replace in the code on **<AZURE_SEARCH_NAME_GOES_HERE>** and **<AZURE_SEARCH_API_KEY_GOES_HERE>**.
