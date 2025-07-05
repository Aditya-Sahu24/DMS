// src/features/auth/authAPI.ts
export const loginAPI = async (userId: string, password: string) => {
  try {
    const res = await fetch(
      'https://dmsreactapi.mssplonline.com/api/USER/USERLOGIN',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          useR_ID: userId,
          password,
          collageID: '1',
          packageID: '1',
        }),
      },
    );

    return await res.json();
  } catch (error) {
    return { isSuccess: false, mesg: 'Network error', data: [] };
  }
};
