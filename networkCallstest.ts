import fetch from 'node-fetch';
import * as t from 'io-ts';
import { isRight, fold } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
// import { PathReporter } from 'io-ts/lib/PathReporter';

interface EmailBranded {
    readonly Email: unique symbol,
}

const EmailType = t.brand(
    t.string,
    (s): s is t.Branded<string, EmailBranded> => s.split('@').length > 1,
    'Email'
);
type Email = t.TypeOf<typeof EmailType>;


const UserType = t.interface({
    userId: t.number,
    id: t.number,
    title: t.string,
    completed: t.boolean,
});

type User = t.TypeOf<typeof UserType>;

const getUsersData = (): Promise<User[]> => fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json());


const run = () => {
    console.log(EmailType.decode('aa@b.com'));

    getUsersData()
        .then(result => result.map(each => pipe(UserType.decode(each), fold(() => { throw new Error('Parsing Failure') }, data => data))))
        .then(console.log);
}

run();