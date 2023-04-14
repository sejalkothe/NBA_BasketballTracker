import { ENVIRONMENT } from '../../environment/environment';
const mainUrl: string = ENVIRONMENT.mainUrl;
const logoBaseUrl: string = ENVIRONMENT.logoUrl;
export class Url {
 
	public static readonly getTeams: string = `${mainUrl}/teams`;
	public static readonly getGameDetails: string = `${mainUrl}/games?{params}`;
	public static readonly logoUrl: string = logoBaseUrl;
}