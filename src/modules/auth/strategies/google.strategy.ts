import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "src/shared/lib/env";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
    constructor() {
        super({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            scope: ["email", "profile"],
        })
    }

    async validate(_accessToken: string, _refreshToken: string, profile: Profile) {
        return {
            email: profile.emails?.[0]?.value,
            name: profile.displayName,
            googleId: profile.id,
            avatar: profile.photos?.[0]?.value,
        }
    }
}