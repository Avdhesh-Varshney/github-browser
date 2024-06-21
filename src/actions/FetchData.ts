'use server'

export const FetchData = async (URL: string) => {
  try {
    const response = await fetch(URL, {
      next: {
        revalidate: 21600,
      },
    });

    if (!response.ok) {
      throw new Error('An error occurred while fetching the users');
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`An error happened: ${error}`);
  }
}
