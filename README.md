# Understand
A PhoneGap application through which you can turn a Wordpress blog into a mobile magazine.


This PhoneGap application is a skeleton (it has a really simple GUI) which allows you to create a mobile magazine application using a Wordpress blog.

The steps to implement it are easy:

1) Install a Wordpress blog

Follow the instructions here: https://codex.wordpress.org/Installing_WordPress

2) Copy the files in "/server" in this repository into your main Wordpress installation folder (where the wp-header.php file is)

3) Change the "fetchContent" javascript function in the "www/js/index.js" JavaScript file, to reflect the domain and folder in which you installed your Wordpress

For example, at line 62 of the file it says:

var urlo = "http://artisopensource.net/understand/getIndex.php";

Modify that to reflect your Wordpress installation.

For example, if you installed your Wordpress on "http://www.foobar.com/myAwesomeMagazine" you should change line 62 to:

var urlo = "http://www.foobar.com/myAwesomeMagazine/getIndex.php";

Do the same for all the other places in which the URLs appear, in the following lines of the JavaScript file.

4) that's it! compile using standard PhoneGap/Cordova modalities (more info here: http://phonegap.com/developer/ )

# Note

The current application uses Apple's iAds, to generate some revenue. If you're not targeting Apple/iOS devices, you should remove the iAD plugin from PhoneGap.

#Thanks!

If you find this useful, please download Understand from the Apple Store, use it, and if you feel like it, click on a few advertisements.

Understand for iPhone:
https://itunes.apple.com/us/app/understand/id974998473?mt=8

Understand for iPad:
https://itunes.apple.com/us/app/understand/id974998473?mt=8

You might get a kick out of it, as I use it to share my favourite articles.