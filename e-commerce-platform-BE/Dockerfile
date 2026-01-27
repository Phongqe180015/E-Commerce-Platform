# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore
COPY ["e-commerce-platform-BE/e-commerce-platform-BE.csproj", "e-commerce-platform-BE/"]
RUN dotnet restore "e-commerce-platform-BE/e-commerce-platform-BE.csproj"

# Copy everything else and build
COPY . .
WORKDIR "/src/e-commerce-platform-BE"
RUN dotnet publish "e-commerce-platform-BE.csproj" -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .

# Create uploads directory
RUN mkdir -p wwwroot/uploads

EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

ENTRYPOINT ["dotnet", "e-commerce-platform-BE.dll"]
