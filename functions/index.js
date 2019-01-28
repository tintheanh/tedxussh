const functions = require('firebase-functions');
const fs = require('fs');

const admin = require('firebase-admin');

admin.initializeApp();

function buildMetaForPost(post, postId) {
  const string = `<meta property="og:description" content="${
    post.description
  }" />
    <meta property="og:url" content="https://tedxussh.com/learn/?post=${postId}" />
    <meta property="og:image" content="${post.thumbnail}" />
    <meta property="og:title" content="TEDxHCMUSSH - ${post.title}" />
    <meta name="twitter:title" content="TEDxHCMUSSH - ${post.title}" />
    <meta name="twitter:description" content="${post.description}" />
    <meta name="twitter:image" content="${post.thumbnail}" />
    `;
  return string;
}

exports.seoFunc = functions.https.onRequest((req, res) => {
  const indexHTML = fs.readFileSync('./index.html').toString();
  const { url } = req;

  let postId = '';
  if (url.includes('post')) {
    let splited = '';
    if (url.includes('fbclid')) {
      splited = url.split('post=');
      postId = splited[1].substring(0, splited[1].length);
    } else {
      postId = url.substring(13, url.length);
    }

    // postId = url.substring(13, url.length);

    console.log(postId);
    console.log(url);
    admin
      .database()
      .ref('/learnPosts/postList')
      .child(postId)
      .once('value')
      .then(snapshot => {
        const post = snapshot.val();
        const responseString = indexHTML.replace(
          '<meta name="functions-insert-dynamic-meta"/>',
          buildMetaForPost(post, postId)
        );
        res.status(200).end(responseString);
      })
      .catch(() => res.status(404).end());
  } else {
    res.status(200).end(indexHTML);
  }
});
