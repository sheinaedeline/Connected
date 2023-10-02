import express from 'express';
import compression from 'compression';
import { json, urlencoded } from 'body-parser';
import root_router from '@routes/root_router';
import cors from 'cors';
const app = express();
app.use(
    compression({threshold: 0}),
    urlencoded({extended:true}),
    json(),
    cors({
        origin: '*',
        optionsSuccessStatus: 200,
    }),
)
app.use("/",root_router)
app.listen(3000, () => {
    console.log(`Application is running on port 3000`);
});