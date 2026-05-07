import { Button, Text, View } from 'react-native'

// import Share from 'react-native-share';

// Share using 3rd Party React Native Share Library

// Commenting the code since it requires Access to RN CLI to install the library

const socialsharinglib = () => {
    const onShare = async () => {
        const options = {
            message: 'Check out this awesome app!',
            url: 'https://your-app-url.com',
            title: 'App Link'
        };

        // try {
        //     const ShareResponse = await Share.open(options);
        //     console.log(JSON.stringify(ShareResponse));
        // } catch (error) {
        //     console.log('Error =>', error);
        // }
    };

    return (
        <View>
            <Button onPress={onShare} title="Share" />
        </View>
    )
}


export default socialsharinglib