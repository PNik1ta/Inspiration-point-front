import { ICompetitionResult } from "../../interfaces/competition-result.interface";
import { IAthAndGroupInitial } from "../../viewInterfaces/first-round/ath-and-group-initial.interface";
import { IFirstRoundViewRow } from "../../viewInterfaces/first-round/first-round-view-row.interface";
import { IInfoViewFirstRound } from "../../viewInterfaces/info-view-first-round.interface";


export function constructFirstRoundViewRow(result: ICompetitionResult, ath: IAthAndGroupInitial, aths: IAthAndGroupInitial[]): IFirstRoundViewRow {
  const firstRoundViewRow: IFirstRoundViewRow = { ath, infoArray: [], result: {} };

  firstRoundViewRow.result = result.groupsResults.find((res) => res.nickname === ath.ath.nickname) ?? {};

  for (let info of result.info) {
    if (info.nicknameLeft === ath.ath.nickname) {

      const infoViewFirstRound: IInfoViewFirstRound = { score: 0, position: 0 };

      infoViewFirstRound.score = info.scoreLeft ?? 0;
      infoViewFirstRound.position = aths.find((ath) => ath.ath.nickname === info.nicknameRight)?.groupInitial.athleteRankPool ?? 0;

      firstRoundViewRow.infoArray.push(infoViewFirstRound);
    } if (info.nicknameRight === ath.ath.nickname) {

      const infoViewFirstRound: IInfoViewFirstRound = { score: 0, position: 0 };

      infoViewFirstRound.score = info.scoreRight ?? 0;
      infoViewFirstRound.position = aths.find((ath) => ath.ath.nickname === info.nicknameLeft)?.groupInitial.athleteRankPool ?? 0;

      firstRoundViewRow.infoArray.push(infoViewFirstRound);
    }
  }

  return firstRoundViewRow;
}