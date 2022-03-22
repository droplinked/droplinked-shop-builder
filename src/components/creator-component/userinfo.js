import posts from '../../assest/profile/posts.svg'
import followers from '../../assest/profile//followers.svg'
import collection from '../../assest/profile/collections-b.svg'

const userinfo = {
	fullname: null,
	isFollowed: false,
	myInterests: [],
	profPic: 'https://graph.facebook.com/10154252181877224/picture?width=512&height=512',
	userId: '3232',
	username: 'mono',
	bullets: [
		{
			amount: '5',
			amountFontClass: 'font-gt',
			imgStyles: { marginRight: '10px' },
			imgUrl: posts,
			section: 'Posts',
		},

		{
			amount: '168',
			amountFontClass: 'font-gt',
			imgStyles: { marginRight: '6px' },
			imgUrl: followers,
			section: 'Followers',
		},

		{
			amount: '1',
			amountFontClass: 'font-gt',
			imgStyles: { marginRight: '6px' },
			imgUrl: followers,
			section: 'Following',
		},

		{
			amount: '3',
			amountFontClass: 'font-gt',
			imgStyles: { marginRight: '6px' },
			imgUrl: collection,
			section: 'Collections',
		},
	],
}

export default userinfo
