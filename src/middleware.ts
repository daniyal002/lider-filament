import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';


function role() {
    const token = cookies().get("access_token");

    if (!token) {
        return null;
    }

    try {
        const parse = JSON.parse(Buffer.from(token.value.split('.')[1], 'base64').toString());
        return parse.user
    } catch (e) {
        console.error('Ошибка при декодировании токена:', e);
        return null;
    }
}

export default function middleware(req: NextRequest) {
    const userRole = role();
    // Проверяем, если пользователь пытается получить доступ к маршруту, начинающемуся с /i/
    if (req.nextUrl.pathname.startsWith('/i')) {
        // Если роль пользователя не соответствует требуемой (например, userRole.user == false)
        if (!userRole || userRole === false) {
            // Перенаправляем на главную страницу
            const absoluteURL = new URL("/", req.nextUrl.origin);
            return NextResponse.redirect(absoluteURL.toString());
        }
    }

    // Если всё в порядке, продолжаем
    return NextResponse.next();
}