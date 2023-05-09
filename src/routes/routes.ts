import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import express, { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';
import {Kishurit, Categorie, SubCategorie, Bussiness, Location} from '../types';
import MailService from "../controller/MailService"
const router: express.Router = express.Router()

const rawdata: Buffer = fs.readFileSync('./src/db.json');
const jsonDB = JSON.parse(rawdata.toString(), (key, value) => value);

const verifyData = (data: any, res: Response, next: NextFunction): void => {
    (!data) ? next() : res.json(data);
};
  
router.use(function(req: Request, res: Response, next: NextFunction) { 
    if (req.method == 'POST' && req.body.key !== process.env.API_KEY) res.status(404).json (null)
    
    else next();
});
 
router.get('/*', function(req: Request, res: Response, next: NextFunction) {
    res.status(404).json ({ status: 404, message: "הדף לא קיים"})
})

router.post('/mail', function(req: Request, res: Response, next: NextFunction) {
    const mailDetails = (req.body);
    var {email, subject, body, name, tel} = mailDetails;
    if (name.trim() == '') name = undefined;
    if (tel.trim() == '') tel = undefined;
    const mail = `Message from ${name} tel: ${tel}\n ${body.trim()}`;
    
    MailService.sendMail ({from: email, subject: subject, text: mail}, req, res);
})  

router.post('/report', function(req: Request, res: Response, next: NextFunction) {
    const { report, name } = req.body as { report: string; name: string }; // Cast req.body to the expected type
    const mail = `Report for ${name}\n${report}`;
    MailService.sendMail({ from: "romanbr@walla.com", subject: 'report', text: mail }, req, res);
  });
  
  router.post('/neworg', function(req: Request, res: Response, next: NextFunction) {
    type Data = {    
        description: string, 
        email1: string, 
        email2: string, 
        facebook_link1: string, 
        facebook_link2: string, 
        instagram_link: string, 
        link1: string, 
        link2: string, 
        link3: string, 
        linkedIn_link: string, 
        message: string, 
        region: string, 
        site_name: string, 
        tel1: string, 
        tel2: string, 
        whatsapp: string, 
    }
    
    const { data } = req.body as { data: Data}; // Cast req.body to the expected type 
    //const email = `${JSON.stringify(data, null, 2)}\n`;
    //MailService.sendMail({ from: 'romanbr@walla.com', subject: 'new organization', text: email }, req, res);*/
    res.send(data);
  });

router.post('/search', (req: Request, res: Response) => {
    const { location, searchText } = req.body as { location: Location, searchText: string };
    let processedSearchText = searchText.toLowerCase();
      
    const searchData: SubCategorie[] = jsonDB.job.reduce((a1: SubCategorie[], c1: Categorie) => {
      const categoryLinks: SubCategorie[] = c1.links.reduce((a2: SubCategorie[], c2: SubCategorie) => {
        const subArr = c2.links.filter((e: Bussiness) => {
          return e.site_name.toLowerCase().includes(processedSearchText) &&
            (location === '' || e.location === location)
        });
        
        if (subArr.length > 0) {
          return [...a2, { cat: c2.cat, links: subArr }];
        } else {
          return a2;
        }
      }, []);
      
      return [...a1, ...categoryLinks];
    }, []);
    
    return res.json({ links: searchData });
  });

router.post('/catNames', function(req: Request, res: Response, next: NextFunction) { 
    res.json(jsonDB.job.map ((e: Categorie) => e.name)); 
});

router.post('/totalNum', function(req: Request, res: Response, next: NextFunction) { 
    const totalNum = jsonDB.job.reduce((acc: number,element: Categorie) => 
    acc +  element.links.reduce ((acc1: number, element1: SubCategorie) => acc1 + element1.links.length, 0), 0)
    res.send(totalNum); 
});

router.post('/', function(req: Request, res: Response, next: NextFunction) { 
    type Data = {
        total: number,
        cat: [{name: string, totNum: number}] 
    }

    const data = jsonDB.job.reduce((acc: Data, element: Categorie) => {
        const totalCatNum = element.links.reduce ((acc1, element1) => acc1 + element1.links.length, 0)
        acc.total += totalCatNum;  
        acc.cat.push ({name: element.name, totNum: totalCatNum});
        return acc;
    }, {total: 0, cat: []})
   
    res.json (data);
});

router.post('/:id/catName', function(req: Request, res: Response, next: NextFunction) { 
    verifyData(jsonDB.job[req.params.id].links.map ((e: SubCategorie) => e.cat), res, next);
});

router.post('/:id/catTotalNum', function(req, res, next) { 
    verifyData(jsonDB.job[req.params.id].links.reduce ((acc1: number, element1: SubCategorie) =>  acc1 + element1.links.length, 0)
    , res, next);
});

router.post('/:id', function(req: Request, res: Response, next: NextFunction) {  
    verifyData(jsonDB.job[req.params.id], res, next);
});

router.post('/:id1/:id2/subCatTotalNum', function(req: Request, res: Response, next: NextFunction) {   
    verifyData(jsonDB.job[req.params.id1].links[req.params.id2].links.length, res, next);
});

router.post('/:id1/:id2', function(req: Request, res: Response, next: NextFunction) { 
    verifyData(jsonDB.job[req.params.id1].links[req.params.id2], res, next); 
});

router.post('/:id1/:id2/:id3', function(req: Request, res: Response, next: NextFunction) { 
    verifyData(jsonDB.job[req.params.id1].links[req.params.id2].links[req.params.id3], res, next); 
});

router.post('/*', function(req: Request, res: Response, next: NextFunction) {
    res.status (404).json ({ status: 404, message: "הדף לא קיים"});
})  

export default router