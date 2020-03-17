export class Idea {
    _id?: string
    title: string;
    likes: string;
    description: string;
    imageURL: string;
    comments: any[];
    _acl?:{creator:string};
}
 