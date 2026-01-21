import { Classroom as ClassroomPrisma } from '@prisma/client';

export class Classroom {
    readonly id?: number;
    readonly name: string;

    constructor(classroom: {
        id?: number;
        name: string;
    }) {
        this.validate(classroom);

        this.id = classroom.id;
        this.name = classroom.name;
    }

    validate(classroom: {
        name: string;
    }) {
        if (!classroom.name?.trim()) {
            throw new Error('Name is required');
        }
    }

    equals({ id, name }): boolean {
        return (
            this.id === id &&
            this.name === name
        );
    }

    static from({ id, name}: ClassroomPrisma) {
        return new Classroom({
            id,
            name,
        });
    }
}
