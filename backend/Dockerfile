FROM microsoft/dotnet:2.1.302-sdk-alpine AS build-env
WORKDIR /app

COPY ./backend/*.csproj ./
RUN dotnet restore

COPY ./backend ./
RUN dotnet publish -c Release -o out

FROM microsoft/dotnet:2.1.1-aspnetcore-runtime-alpine
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT [ "dotnet", "backend.dll" ]