export class Idea {
    _id?: string
    title: string;
    likes: number;
    description: string;
    imageURL: string;
    comments: any[];
    _acl?:{creator:string};
}
 