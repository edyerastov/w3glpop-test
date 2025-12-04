const { getHistory, addTransaction, getPersonalMinigameStats } = require('../controllers/transactionControllers.cjs');
const { express } = require('../shared.cjs');
const { isLoggedIn } = require('../middleware/authMiddleware.cjs')
const router = express.Router();


router.post('/add', isLoggedIn, addTransaction);
router.get('/history/:game/:win_loss?', getHistory);
router.get('/minigame/history/:id', getPersonalMinigameStats);


module.exports = router;