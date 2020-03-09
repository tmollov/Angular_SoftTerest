import { IKmd } from './Ikmd';
import { Iacl } from './Iacl';

export interface ILoginResponseModel {
    _id: string,
    username: string,
    _kmd: IKmd,
    _acl: Iacl
}