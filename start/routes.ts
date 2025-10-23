/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'


router.on('/').render('pages/buyer_page')

router.get('/about',  ({ view }) => {
  return view.render('pages/about')
})

router.get('/service', ({ view }) => {
  return view.render('pages/service')
})

router.get('/contact', ({ view }) => {
  return view.render('pages/contact')
})

router.get('/login', ({ view }) => {
  return view.render('pages/login')
})

router.get('/comercial', ({ view }) => {
  return view.render('pages/comercial')
})

router.get('/register', ({ view }) => {
  return view.render('pages/Register')
})


router.get('/cart', ({ view }) => {
  return view.render('pages/chart')
})

router.get('/product1', ({ view }) => {
  return view.render('pages/product_detail/product1_detail')
})
router.get('/product2', ({ view }) => {
  return view.render('pages/product_detail/product2_detail')
})
router.get('/product3', ({ view }) => {
  return view.render('pages/product_detail/product2_detail')
})
router.get('/product4', ({ view }) => {
  return view.render('pages/product_detail/product4_detail')
})

router.get('/upload', ({ view }) => {
  return view.render('pages/upload_product')
})

router.get('/seller', ({ view }) => {
  return view.render('pages/list_product_seller')
})

router.get('/search', ({ view }) => {
  return view.render('pages/search_page')
})

