module.exports = (req, res) => {
  return res.render('auth/login', {
    page: 'auth/login',
    title: res.__('Login'),
    includes: {
      external: {
        css: ['page', 'general', 'logo', 'inputs', 'buttons', 'fontawesome'],
        js: ['page', 'serverRequest']
      }
    }
  });
}
