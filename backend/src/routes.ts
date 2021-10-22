import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { GetLast3MessagesController } from "./controllers/GetLast3MessagesController";
import { ProfilesUserController } from "./controllers/ProfileUserController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticate";

const router = Router()

router.post('/authenticate', new AuthenticateUserController().handle)

router.post('/messages', ensureAuthenticated, new CreateMessageController().handle)

router.get('/messages/last3', new GetLast3MessagesController().handle)

router.get('/profile', ensureAuthenticated, new ProfilesUserController().handle)

export {router}