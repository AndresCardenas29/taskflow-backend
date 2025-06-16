Start:
server development
set NODE_ENV=local && npm run start:dev

server production
set NODE_ENV=production && npm run start:prod

server local
npm run dev

# info
- user default: admin@email.com
- password default: admin123

# endpoints
```json
{
  "meta": {
    "format": "httpie",
    "version": "1.0.0",
    "contentType": "workspace",
    "schema": "https://schema.httpie.io/1.0.0.json",
    "docs": "https://httpie.io/r/help/export-from-httpie",
    "source": "HTTPie Desktop 2025.2.0"
  },
  "entry": {
    "name": "Inlace",
    "icon": {
      "name": "rocket",
      "color": "red"
    },
    "collections": [
      {
        "name": "Users",
        "icon": {
          "name": "circle",
          "color": "green"
        },
        "auth": {
          "type": "bearer",
          "target": "headers",
          "credentials": {
            "username": "",
            "password": "{{toekn}}"
          }
        },
        "requests": [
          {
            "name": "Create User",
            "url": "{{host}}/users",
            "method": "POST",
            "headers": [],
            "queryParams": [],
            "pathParams": [],
            "auth": {
              "type": "inherited"
            },
            "body": {
              "type": "text",
              "file": {
                "name": ""
              },
              "text": {
                "value": "{\n  \"email\": \"nek@mail.com\",\n  \"username\": \"Nek2\",\n  \"password\": \"nek123\",\n  \"repeatPassword\": \"nek123\"\n}",
                "format": "application/json"
              },
              "form": {
                "isMultipart": false,
                "fields": []
              },
              "graphql": {
                "query": "",
                "variables": ""
              }
            }
          },
          {
            "name": "Login User",
            "url": "{{host}}/auth/login",
            "method": "POST",
            "headers": [],
            "queryParams": [],
            "pathParams": [],
            "auth": {
              "type": "inherited"
            },
            "body": {
              "type": "text",
              "file": {
                "name": ""
              },
              "text": {
                "value": "{\n  \"email\": \"nek@mail.com\",\n  \"pass\": \"nek123\"\n}",
                "format": "application/json"
              },
              "form": {
                "isMultipart": false,
                "fields": []
              },
              "graphql": {
                "query": "",
                "variables": ""
              }
            }
          },
          {
            "name": "Get User by Email (adm)",
            "url": "{{host}}/users/andres",
            "method": "GET",
            "headers": [],
            "queryParams": [],
            "pathParams": [],
            "auth": {
              "type": "bearer",
              "target": "headers",
              "credentials": {
                "username": "",
                "password": "{{tokenAdm}}"
              }
            },
            "body": {
              "type": "text",
              "file": {
                "name": ""
              },
              "text": {
                "value": "",
                "format": "application/json"
              },
              "form": {
                "isMultipart": false,
                "fields": []
              },
              "graphql": {
                "query": "",
                "variables": ""
              }
            }
          },
          {
            "name": "Get Users",
            "url": "{{host}}/users",
            "method": "GET",
            "headers": [],
            "queryParams": [],
            "pathParams": [],
            "auth": {
              "type": "inherited"
            },
            "body": {
              "type": "text",
              "file": {
                "name": ""
              },
              "text": {
                "value": "{\n  \"hello\": \"world\"\n}",
                "format": "application/json"
              },
              "form": {
                "isMultipart": false,
                "fields": []
              },
              "graphql": {
                "query": "",
                "variables": ""
              }
            }
          },
          {
            "name": "UpdateUser",
            "url": "{{host}}/users/3",
            "method": "PATCH",
            "headers": [],
            "queryParams": [],
            "pathParams": [],
            "auth": {
              "type": "bearer",
              "target": "headers",
              "credentials": {
                "username": "",
                "password": "{{toekn}}"
              }
            },
            "body": {
              "type": "text",
              "file": {
                "name": ""
              },
              "text": {
                "value": "{\n  \"username\": \"NekDress22\"\n}",
                "format": "application/json"
              },
              "form": {
                "isMultipart": false,
                "fields": []
              },
              "graphql": {
                "query": "",
                "variables": ""
              }
            }
          },
          {
            "name": "Delete User",
            "url": "{{host}}/users/1",
            "method": "DELETE",
            "headers": [],
            "queryParams": [],
            "pathParams": [],
            "auth": {
              "type": "bearer",
              "target": "headers",
              "credentials": {
                "username": "",
                "password": "{{toekn}}"
              }
            },
            "body": {
              "type": "none",
              "file": {
                "name": ""
              },
              "text": {
                "value": "",
                "format": "application/json"
              },
              "form": {
                "isMultipart": false,
                "fields": []
              },
              "graphql": {
                "query": "",
                "variables": ""
              }
            }
          },
          {
            "name": "Get info token",
            "url": "{{host}}/users/me",
            "method": "GET",
            "headers": [],
            "queryParams": [],
            "pathParams": [],
            "auth": {
              "type": "bearer",
              "target": "headers",
              "credentials": {
                "username": "",
                "password": "{{tokenAdm}}"
              }
            },
            "body": {
              "type": "none",
              "file": {
                "name": ""
              },
              "text": {
                "value": "",
                "format": "application/json"
              },
              "form": {
                "isMultipart": false,
                "fields": []
              },
              "graphql": {
                "query": "",
                "variables": ""
              }
            }
          },
          {
            "name": "Add Task",
            "url": "{{host}}/users/add-task",
            "method": "POST",
            "headers": [],
            "queryParams": [],
            "pathParams": [],
            "auth": {
              "type": "inherited"
            },
            "body": {
              "type": "text",
              "file": {
                "name": ""
              },
              "text": {
                "value": "{\n  \"id\": 1,\n  \"title\": \"Task 1\",\n  \"description\": \"Descripción\",\n  \"deadline\": null,\n  \"status\": \"created\",\n  \"created_at\": \"2025-06-14T22:15:01.000Z\",\n  \"updated_at\": \"2025-06-14T22:15:01.000Z\"\n}",
                "format": "application/json"
              },
              "form": {
                "isMultipart": false,
                "fields": []
              },
              "graphql": {
                "query": "",
                "variables": ""
              }
            }
          },
          {
            "name": "Remove Task",
            "url": "{{host}}/users/remove-task",
            "method": "POST",
            "headers": [],
            "queryParams": [],
            "pathParams": [],
            "auth": {
              "type": "inherited"
            },
            "body": {
              "type": "text",
              "file": {
                "name": ""
              },
              "text": {
                "value": "{\n  \"id\": 1,\n  \"title\": \"Task 1\",\n  \"description\": \"Descripción\",\n  \"deadline\": null,\n  \"status\": \"created\",\n  \"created_at\": \"2025-06-14T22:15:01.000Z\",\n  \"updated_at\": \"2025-06-14T22:15:01.000Z\"\n}",
                "format": "application/json"
              },
              "form": {
                "isMultipart": false,
                "fields": []
              },
              "graphql": {
                "query": "",
                "variables": ""
              }
            }
          },
          {
            "name": "Get User Tasks",
            "url": "{{host}}/users/tasks",
            "method": "GET",
            "headers": [],
            "queryParams": [],
            "pathParams": [],
            "auth": {
              "type": "inherited"
            },
            "body": {
              "type": "none",
              "file": {
                "name": ""
              },
              "text": {
                "value": "",
                "format": "application/json"
              },
              "form": {
                "isMultipart": false,
                "fields": []
              },
              "graphql": {
                "query": "",
                "variables": ""
              }
            }
          },
          {
            "name": "Add Project",
            "url": "{{host}}/users/add-project",
            "method": "POST",
            "headers": [],
            "queryParams": [],
            "pathParams": [],
            "auth": {
              "type": "inherited"
            },
            "body": {
              "type": "text",
              "file": {
                "name": ""
              },
              "text": {
                "value": "{\n  \"id\": 1,\n  \"title\": \"Task 1\",\n  \"description\": \"Descripción\",\n  \"deadline\": null,\n  \"status\": \"created\",\n  \"created_at\": \"2025-06-14T22:15:01.000Z\",\n  \"updated_at\": \"2025-06-14T22:15:01.000Z\"\n}",
                "format": "application/json"
              },
              "form": {
                "isMultipart": false,
                "fields": []
              },
              "graphql": {
                "query": "",
                "variables": ""
              }
            }
          },
          {
            "name": "Remove Project",
            "url": "{{host}}/users/remove-project",
            "method": "POST",
            "headers": [],
            "queryParams": [],
            "pathParams": [],
            "auth": {
              "type": "inherited"
            },
            "body": {
              "type": "text",
              "file": {
                "name": ""
              },
              "text": {
                "value": "{\n  \"id\": 1,\n  \"title\": \"Task 1\",\n  \"description\": \"Descripción\",\n  \"deadline\": null,\n  \"status\": \"created\",\n  \"created_at\": \"2025-06-14T22:15:01.000Z\",\n  \"updated_at\": \"2025-06-14T22:15:01.000Z\"\n}",
                "format": "application/json"
              },
              "form": {
                "isMultipart": false,
                "fields": []
              },
              "graphql": {
                "query": "",
                "variables": ""
              }
            }
          },
          {
            "name": "Get User Projects",
            "url": "{{host}}/users/projects",
            "method": "GET",
            "headers": [],
            "queryParams": [],
            "pathParams": [],
            "auth": {
              "type": "inherited"
            },
            "body": {
              "type": "none",
              "file": {
                "name": ""
              },
              "text": {
                "value": "",
                "format": "application/json"
              },
              "form": {
                "isMultipart": false,
                "fields": []
              },
              "graphql": {
                "query": "",
                "variables": ""
              }
            }
          }
        ]
      },
      {
        "name": "Tasks",
        "icon": {
          "name": "circle",
          "color": "green"
        },
        "auth": {
          "type": "none"
        },
        "requests": [
          {
            "name": "Create Task",
            "url": "{{host}}/tasks",
            "method": "POST",
            "headers": [],
            "queryParams": [],
            "pathParams": [],
            "auth": {
              "type": "inherited"
            },
            "body": {
              "type": "text",
              "file": {
                "name": ""
              },
              "text": {
                "value": "{\n  \"title\": \"Task 1\",\n  \"description\": \"Descripción\"\n}",
                "format": "application/json"
              },
              "form": {
                "isMultipart": false,
                "fields": []
              },
              "graphql": {
                "query": "",
                "variables": ""
              }
            }
          },
          {
            "name": "Get Tasks",
            "url": "{{host}}/tasks",
            "method": "GET",
            "headers": [],
            "queryParams": [],
            "pathParams": [],
            "auth": {
              "type": "inherited"
            },
            "body": {
              "type": "none",
              "file": {
                "name": ""
              },
              "text": {
                "value": "",
                "format": "application/json"
              },
              "form": {
                "isMultipart": false,
                "fields": []
              },
              "graphql": {
                "query": "",
                "variables": ""
              }
            }
          },
          {
            "name": "Get Task",
            "url": "{{host}}/tasks/1",
            "method": "GET",
            "headers": [],
            "queryParams": [],
            "pathParams": [],
            "auth": {
              "type": "inherited"
            },
            "body": {
              "type": "none",
              "file": {
                "name": ""
              },
              "text": {
                "value": "",
                "format": "application/json"
              },
              "form": {
                "isMultipart": false,
                "fields": []
              },
              "graphql": {
                "query": "",
                "variables": ""
              }
            }
          },
          {
            "name": "Update Task",
            "url": "{{host}}/tasks/1",
            "method": "PATCH",
            "headers": [],
            "queryParams": [],
            "pathParams": [],
            "auth": {
              "type": "inherited"
            },
            "body": {
              "type": "text",
              "file": {
                "name": ""
              },
              "text": {
                "value": "{\n  \"id\": 1,\n  \"title\": \"Task 1\",\n  \"description\": \"Descripción\",\n  \"deadline\": \"2025-06-14\",\n  \"status\": \"doing\"\n}",
                "format": "application/json"
              },
              "form": {
                "isMultipart": false,
                "fields": []
              },
              "graphql": {
                "query": "",
                "variables": ""
              }
            }
          },
          {
            "name": "Delete Task",
            "url": "{{host}}/tasks/1",
            "method": "DELETE",
            "headers": [],
            "queryParams": [],
            "pathParams": [],
            "auth": {
              "type": "inherited"
            },
            "body": {
              "type": "none",
              "file": {
                "name": ""
              },
              "text": {
                "value": "",
                "format": "application/json"
              },
              "form": {
                "isMultipart": false,
                "fields": []
              },
              "graphql": {
                "query": "",
                "variables": ""
              }
            }
          }
        ]
      },
      {
        "name": "Projects",
        "icon": {
          "name": "circle",
          "color": "green"
        },
        "auth": {
          "type": "none"
        },
        "requests": [
          {
            "name": "Create Project",
            "url": "{{host}}/projects",
            "method": "POST",
            "headers": [],
            "queryParams": [],
            "pathParams": [],
            "auth": {
              "type": "inherited"
            },
            "body": {
              "type": "text",
              "file": {
                "name": ""
              },
              "text": {
                "value": "{\n  \"name\": \"ToDo App\",\n  \"description\": \"Descripción\",\n  \"status\": \"end\"\n}",
                "format": "application/json"
              },
              "form": {
                "isMultipart": false,
                "fields": []
              },
              "graphql": {
                "query": "",
                "variables": ""
              }
            }
          },
          {
            "name": "Get Projects",
            "url": "{{host}}/projects",
            "method": "GET",
            "headers": [],
            "queryParams": [],
            "pathParams": [],
            "auth": {
              "type": "inherited"
            },
            "body": {
              "type": "none",
              "file": {
                "name": ""
              },
              "text": {
                "value": "",
                "format": "application/json"
              },
              "form": {
                "isMultipart": false,
                "fields": []
              },
              "graphql": {
                "query": "",
                "variables": ""
              }
            }
          },
          {
            "name": "Get Project",
            "url": "{{host}}/projects/1",
            "method": "GET",
            "headers": [],
            "queryParams": [],
            "pathParams": [],
            "auth": {
              "type": "inherited"
            },
            "body": {
              "type": "none",
              "file": {
                "name": ""
              },
              "text": {
                "value": "",
                "format": "application/json"
              },
              "form": {
                "isMultipart": false,
                "fields": []
              },
              "graphql": {
                "query": "",
                "variables": ""
              }
            }
          },
          {
            "name": "Update Project",
            "url": "{{host}}/projects/1",
            "method": "PATCH",
            "headers": [],
            "queryParams": [],
            "pathParams": [],
            "auth": {
              "type": "inherited"
            },
            "body": {
              "type": "text",
              "file": {
                "name": ""
              },
              "text": {
                "value": "{\n  \"name\": \"ToDo App 1\",\n  \"description\": \"Descripción 1\",\n  \"status\": \"start\"\n}",
                "format": "application/json"
              },
              "form": {
                "isMultipart": false,
                "fields": []
              },
              "graphql": {
                "query": "",
                "variables": ""
              }
            }
          },
          {
            "name": "Remove Project",
            "url": "{{host}}/projects/2",
            "method": "DELETE",
            "headers": [],
            "queryParams": [],
            "pathParams": [],
            "auth": {
              "type": "inherited"
            },
            "body": {
              "type": "none",
              "file": {
                "name": ""
              },
              "text": {
                "value": "",
                "format": "application/json"
              },
              "form": {
                "isMultipart": false,
                "fields": []
              },
              "graphql": {
                "query": "",
                "variables": ""
              }
            }
          }
        ]
      },
      {
        "name": "Comment",
        "icon": {
          "name": "paperPencil",
          "color": "green"
        },
        "auth": {
          "type": "bearer",
          "target": "headers",
          "credentials": {
            "username": "",
            "password": "{{toekn}}"
          }
        },
        "requests": [
          {
            "name": "Create Comment",
            "url": "{{host}}/comments",
            "method": "POST",
            "headers": [],
            "queryParams": [],
            "pathParams": [],
            "auth": {
              "type": "inherited"
            },
            "body": {
              "type": "text",
              "file": {
                "name": ""
              },
              "text": {
                "value": "{\n  \"content\": \"mensaje de prueba\",\n  \"task_id\": 1\n}",
                "format": "application/json"
              },
              "form": {
                "isMultipart": false,
                "fields": []
              },
              "graphql": {
                "query": "",
                "variables": ""
              }
            }
          }
        ]
      }
    ],
    "environments": [
      {
        "name": "Defaults",
        "color": "gray",
        "isDefault": true,
        "isLocalOnly": false,
        "variables": [
          {
            "name": "host",
            "value": "localhost:4000",
            "isSecret": false
          },
          {
            "name": "toekn",
            "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoibmVrQG1haWwuY29tIiwidXNlcm5hbWUiOiJOZWsiLCJpYXQiOjE3NTAwODY1NDQsImV4cCI6MTc1MDE3Mjk0NH0.14OzqIlQyVMHxt58XjkFUzY62N7IhyNLRx4zqEbpm1E",
            "isSecret": false
          },
          {
            "name": "tokenAdm",
            "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoiYW5kcmVzQG1haWwuY29tIiwidXNlcm5hbWUiOiJhbmRyZXMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDk4NzIzMDksImV4cCI6MTc0OTk1ODcwOX0.VLsLiVkuhzN76mxOxH5M2nrUrJKx630CACPZnqzD37k",
            "isSecret": false
          }
        ]
      },
      {
        "name": "admin",
        "color": "gray",
        "isDefault": false,
        "isLocalOnly": false,
        "variables": [
          {
            "name": "host",
            "value": "",
            "isSecret": false
          },
          {
            "name": "toekn",
            "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoibmVrQG1haWwuY29tIiwidXNlcm5hbWUiOiJOZWsiLCJpYXQiOjE3NDk5Mzg2NTIsImV4cCI6MTc1MDAyNTA1Mn0.W1Z007xCK2Q5CFXH_3rFRREiHzZENQHomSonyt7op5M",
            "isSecret": false
          },
          {
            "name": "tokenAdm",
            "value": "",
            "isSecret": false
          }
        ]
      }
    ],
    "drafts": []
  }
}
```