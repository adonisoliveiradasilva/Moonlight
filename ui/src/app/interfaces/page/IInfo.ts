export interface IChild{
    name: string,
    url: string
}

export interface IInfo{
    name: string;
    icon: string;
    children: IChild[]
}
