import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { CreateCompetitionResultDto } from "../dto/create-competition-result.dto";
import { Observable, from, switchMap } from "rxjs";
import { BaseResponse } from "../models/base-response";
import { ICompetitionResult } from "../interfaces/competition-result.interface";
import { UpdateCompetitionResultDto } from "../dto/update-competition-result.dto";
import { environment } from "../../environments/environment.development";

@Injectable({ providedIn: 'root' })
export class CompetitionResultService {
  apiUrl: string = environment.apiUrl;

  constructor(
    private readonly http: HttpClient
  ) { }

  create(dto: CreateCompetitionResultDto): Observable<BaseResponse<ICompetitionResult>> {
    let url: string = this.apiUrl + '/api/competitionResult';
    return this.http.post<BaseResponse<ICompetitionResult>>(url, dto, { withCredentials: true });
  }

  findAll(): Observable<BaseResponse<ICompetitionResult[]>> {
    let url: string = this.apiUrl + '/api/competitionResult';
    return this.http.get<BaseResponse<ICompetitionResult[]>>(url, { withCredentials: true });
  }

  findById(id: string): Observable<BaseResponse<ICompetitionResult>> {
    let url: string = this.apiUrl + '/api/competitionResult/' + id;
    return this.http.get<BaseResponse<ICompetitionResult>>(url, { withCredentials: true });
  }

  findByCompetitionId(compId: string): Observable<BaseResponse<ICompetitionResult>> {
    let url: string = this.apiUrl + '/api/competitionResult/find-by-competition-id/' + compId;
    return this.http.get<BaseResponse<ICompetitionResult>>(url, { withCredentials: true });
  }

  delete(id: string): Observable<BaseResponse<ICompetitionResult>> {
    let url: string = this.apiUrl + '/api/competitionResult/' + id;
    return this.http.delete<BaseResponse<ICompetitionResult>>(url, { withCredentials: true });
  }

  update(id: string, dto: UpdateCompetitionResultDto): Observable<BaseResponse<ICompetitionResult>> {
    let url: string = this.apiUrl + '/api/competitionResult/' + id;
    return this.http.put<BaseResponse<ICompetitionResult>>(url, dto, { withCredentials: true });
  }

  shouldAddOrUpdate(data: ICompetitionResult): Observable<BaseResponse<ICompetitionResult>> {
    return this.findByCompetitionId(data.newCompetitionForm.competitionId).pipe(
      switchMap((res: BaseResponse<ICompetitionResult>) => {
        if (res.data) {
          return from(this.update(res.data._id!, data));
        } else {
          return this.create(data);
        }
      })
    );
  }
}