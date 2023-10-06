import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { CreateCompetitionDto } from "../dto/create-competition-result.dto";
import { Observable, from, switchMap } from "rxjs";
import { BaseResponse } from "../models/base-response";
import { ICompetition } from "../interfaces/competition.interface";
import { UpdateCompetitionDto } from "../dto/update-competition-result.dto";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class CompetitionService {
  apiUrl: string = environment.apiUrl;

  constructor(
    private readonly http: HttpClient
  ) { }

  create(dto: CreateCompetitionDto): Observable<BaseResponse<ICompetition>> {
    let url: string = this.apiUrl + '/competition';
    return this.http.post<BaseResponse<ICompetition>>(url, dto, { withCredentials: true });
  }

  findAll(): Observable<BaseResponse<ICompetition[]>> {
    let url: string = this.apiUrl + '/competition';
    return this.http.get<BaseResponse<ICompetition[]>>(url, { withCredentials: true });
  }

  findById(id: string): Observable<BaseResponse<ICompetition>> {
    let url: string = this.apiUrl + '/competition/' + id;
    return this.http.get<BaseResponse<ICompetition>>(url, { withCredentials: true });
  }

  findByCompetitionId(compId: string): Observable<BaseResponse<ICompetition>> {
    let url: string = this.apiUrl + '/competition/find-by-competition-id/' + compId;
    return this.http.get<BaseResponse<ICompetition>>(url, { withCredentials: true });
  }

  delete(id: string): Observable<BaseResponse<ICompetition>> {
    let url: string = this.apiUrl + '/competition/' + id;
    return this.http.delete<BaseResponse<ICompetition>>(url, { withCredentials: true });
  }

  update(id: string, dto: UpdateCompetitionDto): Observable<BaseResponse<ICompetition>> {
    let url: string = this.apiUrl + '/competition/' + id;
    return this.http.put<BaseResponse<ICompetition>>(url, dto, { withCredentials: true });
  }

  shouldAddOrUpdate(data: ICompetition): Observable<BaseResponse<ICompetition>> {
    return this.findByCompetitionId(data.newCompetitionForm.competitionId).pipe(
      switchMap((res: BaseResponse<ICompetition>) => {
        if (res.data) {
          return from(this.update(res.data._id!, data));
        } else {
          return this.create(data);
        }
      })
    );
  }
}