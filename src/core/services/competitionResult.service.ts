import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { CreateCompetitionResultDto } from "../dto/create-competition-result.dto";
import { Observable, from, switchMap } from "rxjs";
import { BaseResponse } from "../models/base-response";
import { ICompetitionResult } from "../interfaces/competition-result.interface";
import { UpdateCompetitionResultDto } from "../dto/update-competition-result.dto";

@Injectable({ providedIn: 'root' })
export class CompetitionResultService {
  constructor(
    private readonly http: HttpClient
  ) { }

  create(dto: CreateCompetitionResultDto): Observable<BaseResponse<ICompetitionResult>> {
    let url: string = '/api/competitionResult';
    return this.http.post<BaseResponse<ICompetitionResult>>(url, dto);
  }

  findAll(): Observable<BaseResponse<ICompetitionResult[]>> {
    let url: string = '/api/competitionResult';
    return this.http.get<BaseResponse<ICompetitionResult[]>>(url);
  }

  findById(id: string): Observable<BaseResponse<ICompetitionResult>> {
    let url: string = '/api/competitionResult/' + id;
    return this.http.get<BaseResponse<ICompetitionResult>>(url);
  }

  findByCompetitionId(compId: string): Observable<BaseResponse<ICompetitionResult>> {
    let url: string = '/api/competitionResult/find-by-competition-id/' + compId;
    return this.http.get<BaseResponse<ICompetitionResult>>(url);
  }

  delete(id: string): Observable<BaseResponse<ICompetitionResult>> {
    let url: string = '/api/competitionResult/' + id;
    return this.http.delete<BaseResponse<ICompetitionResult>>(url);
  }

  update(id: string, dto: UpdateCompetitionResultDto): Observable<BaseResponse<ICompetitionResult>> {
    let url: string = '/api/competitionResult/' + id;
    return this.http.put<BaseResponse<ICompetitionResult>>(url, dto);
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