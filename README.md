# Phone Book App
##### Development Setup:
1. Ensure you have Azure Cosmos DB emulator running on https://localhost:8081/. Download and install the emulator: https://aka.ms/cosmosdb-emulator. Instructions: https://docs.microsoft.com/en-us/azure/cosmos-db/local-emulator
2. open up cmd/powershell and set the working directory as PhoneBook (Server) folder of the solution
3. Run the following command to start the server app:
    ___
    dotnet run
    ___
4. This will run the server app and get things ready.
5. open another cmd/powershell and set the working directory as the phonebook-SPA (client) folder of the solution
6. Run the following command to start the client app:
    ___
    npm start
    ___
7. You can then navigate to localhost:4200 from your browser to use the app

There's no seed data, so you'll need to add the data through the UI.
#### The application demonstrates: 
1. The use of a document DB with RESTful API. (.Net Core 3.1) 
2. Server side pagination.
3. Client side data filtering, sorting and pagination.
4. SPA development. (Angular 9)

