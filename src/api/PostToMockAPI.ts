export const postImageandLocationToAPI = async (
  imagePath: string,
  longitude: number,
  latitude: number,
) => {
  try {
    const currentDate = new Date().toISOString();
    const response = await fetch(
      'https://66002202df565f1a6145d950.mockapi.io/images/image',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: imagePath,
          date: currentDate,
          location: {longitude, latitude},
        }),
      },
    );
    if (!response.ok) {
      throw new Error('Failed to post image to mock API');
    }
    console.log('Image posted to mock API:', imagePath);
  } catch (error) {
    console.error('Error posting image to mock API:', error);
  }
};
