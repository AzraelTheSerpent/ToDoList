# To Do List

To Do List - небольшое web-приложение для хранения заметок, готовое к развертовыванию на любом сервере.

## Стек технологий

- __.NET 9.0__ (ASP.NET Core Web API)
- __MySQL__ с Entity Framework Core 10
- __Repository Pattern__
- __Swagger__ для автоматической документации
- __ReactJS__
- __Docker__
- __NGINX__

## Сущность Record
| Свойство | Тип | Описание |
|----------|-----|----------|
| `Id` | `Guid` | PK |
| `Title` | `string` | Название |
| `Description` | `string` | Описание |
| `CreatesOn` | `DateTime` |  Дата и время создания |
| `IsCompleted` | `bool` | Статус выполнения |

## API Endpoints

### Record (/api/records)
| Метод | Endpoint | Описание | Request DTO | Response DTO |
|-------|----------|----------|-------------|--------------|
| Get | /api/records | Все заметки | GetReccordDto <ul><li>Search<li>SortItem<li>SortOrder<ul/> | List\<RecordDto\> <ul><li>Id<li>Tittle<li>Description<li>CreatedOn<li>IsCompleted<ul/> |
| Post | /api/records | Создание заметки | CreateRecordDto <ul><li>Title<li>Description<ul/> | - |
| Delete | /api/records{id} | Удалить заметку | - | - |
| Put | /api/records{id} | Изменить заметку | PutRecordDto <ul><li>Title<li>Description<li>IsCompleted<ul/> | - |

## Preview
<details><summary><b style="font-size: 18px">Screenshoots</b></summary>
![Main page](/img/start.png)
</details>


## Deploy

Для того чтобы развернуть приложение на сервере скопируйте репозиторий:
 ```bash
 $ git clone https://github.com/AzraelTheSerpent/ToDoList.git
 ```

Замените `localhost` на ip или домен сервера в файлах:
- ToDoList/nginx.conf
- ToDoList/Frontend/src/services/todos.js
- ToDoList/Frontend/src/components/ToDoItem.jsx
- ToDoList/Frontend/src/components/AddToDoForm.jsx

Затем перейдите в корневую папку проекта и выполните команду `docker compose up --build` 
 ```bash
 $ cd ./ToDoList
 $ docker compose up --build
 ```