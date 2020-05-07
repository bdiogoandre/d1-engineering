FROM microsoft/dotnet:2.1.302-sdk-alpine AS build-env
WORKDIR /app
EXPOSE 80
EXPOSE 443

COPY *.csproj ./
RUN dotnet restore

COPY . ./
RUN dotnet publish -c Release -o out

FROM microsoft/dotnet:2.1.1-aspnetcore-runtime-alpine
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT [ "dotnet", "backend.dll" ]