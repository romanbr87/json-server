export type Location = "" | "north" | "south" | "center" | "yosh";

export type Bussiness = {
    site_name: string, 
    link: string, 
    link2?: string, 
    facebook_link1?: string, 
    facebook_link2?: string, 
    facebook_link3?: string[],
    linkedIn_link?: string, 
    instagram_link?: string
    email1?: string, 
    email2?: string, 
    tel1?: string, 
    tel2?: string, 
    whatsapp?: string, 
    location?: Location;
}

export type SubCategorie = {
    cat: string,
    links: Bussiness[]
}

export type Categorie = {
    name: string,
    desc: string,
    links: SubCategorie[]
} 

export type Kishurit = {
    job: Categorie[],
    text: {
        desc: string,
        about: string
    }
}
