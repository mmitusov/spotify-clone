//В сервисах мы описываем бизнесс процессы и бизнесс логику. Получить что-то с БД, как то обработать и что-то вернуть 
//И один сервис может использоваться в разных контроллерах
//Помечаем его @Injectable() - для использование как Dependancy Injection внутри других компонентов/классов
//Dependancy Injection - это когда мы внедряем какие-то внешние компоненты/классы, внутрь какого-то другого нужного нам компонента/класса
//Но чтобы наш Сервис заработал, его необходимо сперва зарегестрировать в родительском модуле - app.module.ts

import { Injectable } from  "@nestjs/common";

@Injectable()
export class AppService {
    getUsers(): string {
        return 'Get all users'
    }
}  